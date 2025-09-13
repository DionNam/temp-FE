"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BaseLink from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlock from "@tiptap/extension-code-block";
import { Button } from "@/components/ui/button";
import { compressImage } from "@/utils/imageCompression";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  ChevronDown,
  X,
} from "lucide-react";

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const Link = BaseLink.extend({
  inclusive: false,
  exitable: true,
}).configure({
  autolink: true,
  linkOnPaste: true,
  openOnClick: true,
  protocols: ["http", "https", "mailto", "tel"],
  HTMLAttributes: {
    class: "text-primary-blue-600 hover:text-primary-blue-700 underline",
    rel: "noopener noreferrer nofollow",
    target: "_blank",
  },
  validate: (href: string) => {
    try {
      const u = new URL(href);
      return ["http:", "https:", "mailto:", "tel:"].includes(u.protocol);
    } catch {
      return false;
    }
  },
});

type Align = "left" | "center" | "right" | "justify";
type ToolbarState = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  bulletList: boolean;
  orderedList: boolean;
  blockquote: boolean;
  codeBlock: boolean;
  heading: 0 | 1 | 2 | 3;
  align: Align;
  linkActive: boolean;
  linkUrl: string;
};

export function RichTextEditor({
  content = "",
  onChange,
  placeholder = "Start writing your blog content...",
  className = "",
}: RichTextEditorProps) {
  const [showTextStyleDropdown, setShowTextStyleDropdown] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isTypingInLink, setIsTypingInLink] = useState(false);
  const [isUrlInText, setIsUrlInText] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [toolbar, setToolbar] = useState<ToolbarState>({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    bulletList: false,
    orderedList: false,
    blockquote: false,
    codeBlock: false,
    heading: 0,
    align: "left",
    linkActive: false,
    linkUrl: "",
  });

  useEffect(() => setIsMounted(true), []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: false,
      }),
      Underline,
      Link,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg shadow-sm",
        },
        allowBase64: true,
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "bg-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "tiptap-content focus:outline-none min-h-[400px] p-4 relative prose prose-sm sm:prose [&_p]:whitespace-pre-wrap",
        style: "tab-size: 4;",
      },
    },
    immediatelyRender: false,
  });

  const isUrl = (text: string) => {
    if (!text.trim()) return false;
    let urlToTest = text.trim();
    if (
      !urlToTest.startsWith("http://") &&
      !urlToTest.startsWith("https://") &&
      !urlToTest.startsWith("mailto:") &&
      !urlToTest.startsWith("tel:")
    ) {
      urlToTest = "https://" + urlToTest;
    }
    try {
      new URL(urlToTest);
      return true;
    } catch {
      return false;
    }
  };

  const normalizeUrl = (raw: string) => {
    let u = raw.trim();
    if (
      !u.startsWith("http://") &&
      !u.startsWith("https://") &&
      !u.startsWith("mailto:") &&
      !u.startsWith("tel:")
    ) {
      u = "https://" + u;
    }
    return u;
  };

  const currentTextStyleLabel = () => {
    switch (toolbar.heading) {
      case 1:
        return "Heading 1";
      case 2:
        return "Heading 2";
      case 3:
        return "Heading 3";
      default:
        return "Normal text";
    }
  };

  const refreshToolbar = useCallback(() => {
    if (!editor) return;

    const align: Align =
      (["left", "center", "right", "justify"] as const).find((a) =>
        editor.isActive({ textAlign: a })
      ) || "left";

    let heading: 0 | 1 | 2 | 3 = 0;
    if (editor.isActive("heading", { level: 1 })) heading = 1;
    else if (editor.isActive("heading", { level: 2 })) heading = 2;
    else if (editor.isActive("heading", { level: 3 })) heading = 3;

    const linkActive = editor.isActive("link");
    const linkUrl = editor.getAttributes("link")?.href || "";

    setToolbar({
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      underline: editor.isActive("underline"),
      strike: editor.isActive("strike"),
      bulletList: editor.isActive("bulletList"),
      orderedList: editor.isActive("orderedList"),
      blockquote: editor.isActive("blockquote"),
      codeBlock: editor.isActive("codeBlock"),
      heading,
      align,
      linkActive,
      linkUrl,
    });

    setIsTypingInLink(linkActive);
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    const onSel = () => refreshToolbar();
    const onTxn = () => refreshToolbar();
    const onUpd = () => refreshToolbar();

    editor.on("selectionUpdate", onSel);
    editor.on("transaction", onTxn);
    editor.on("update", onUpd);

    refreshToolbar();

    return () => {
      editor.off("selectionUpdate", onSel);
      editor.off("transaction", onTxn);
      editor.off("update", onUpd);
    };
  }, [editor, refreshToolbar]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!editor) return;
      const key = event.key;

      if ((key === " " || key === "Enter") && editor.isActive("link")) {
        event.preventDefault();
        editor
          .chain()
          .focus()
          .unsetLink()
          .insertContent(key === " " ? " " : "\n")
          .run();
      }

      if (key === "Tab") {
        event.preventDefault();
        const spaces = "    ";
        editor.chain().focus().insertContent(spaces).run();
      }

      if (key === "Backspace") {
        const { from, to } = editor.state.selection;
        if (from === to) {
          const textBefore = editor.state.doc.textBetween(
            Math.max(0, from - 4),
            from
          );
          if (textBefore === "    ") {
            event.preventDefault();
            editor.chain().focus().deleteRange({ from: from - 4, to }).run();
            return;
          }
        }
      }
    },
    [editor]
  );

  useEffect(() => {
    if (!editor) return;
    const el = editor.view.dom;
    el.addEventListener("keydown", handleKeyDown);
    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [editor, handleKeyDown]);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      if (editor.isDestroyed) return;
      const timer = setTimeout(() => {
        if (!editor.isDestroyed) {
          const currentContent = editor.getHTML();
          if (content !== currentContent) {
            const safe = sanitizeHtml(content || "");
            if (safe !== currentContent) {
              editor.commands.setContent(safe);
              refreshToolbar();
            }
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [editor, content, refreshToolbar]);


  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      try {
        const compressedImage = await compressImage(file);
        if (compressedImage && editor) {
          editor
            .chain()
            .focus()
            .setImage({
              src: compressedImage,
              alt: file.name || "Uploaded image",
            })
            .run();
          refreshToolbar();
        }
      } catch (e) {
        alert(e instanceof Error ? e.message : "Failed to process image");
      }
    },
    [editor, refreshToolbar]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((f) => f.type.startsWith("image/"));
      if (imageFile) handleFileUpload(imageFile);
      else alert("Please drop an image file");
    },
    [handleFileUpload]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const items = Array.from(e.clipboardData?.items || []);
      const imageItem = items.find((i) => i.type.startsWith("image/"));
      if (imageItem) {
        const file = imageItem.getAsFile();
        if (file) handleFileUpload(file);
        return;
      }

      const html = e.clipboardData?.getData("text/html");
      if (html && editor) {
        e.preventDefault();
        const safe = sanitizeHtml(html);
        editor.chain().focus().insertContent(safe).run();
        refreshToolbar();
      }
    },
    [handleFileUpload, editor, refreshToolbar]
  );

  useEffect(() => {
    if (!editor) return;
    const el = editor.view.dom;
    el.addEventListener("paste", handlePaste);
    return () => el.removeEventListener("paste", handlePaste);
  }, [editor, handlePaste]);

  const getCurrentLinkUrl = () => toolbar.linkUrl;

  const addLink = useCallback(() => {
    if (!editor) return;
    if (editor.isActive("link")) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      refreshToolbar();
      return;
    }
    const prev = editor.getAttributes("link").href;
    const selectedText =
      editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to
      ) || "";

    setLinkUrl(prev || "");
    setLinkText(selectedText);
    setShowLinkModal(true);
  }, [editor, refreshToolbar]);

  const handleLinkTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setLinkText(text);
      const urlDetected = Boolean(text.trim() && isUrl(text.trim()));
      setIsUrlInText(urlDetected);
      if (urlDetected && !linkUrl.trim()) setLinkUrl(text.trim());
      if (!urlDetected && linkUrl.trim() === text.trim()) setLinkUrl("");
    },
    [linkUrl]
  );

  const handleLinkCancel = useCallback(() => {
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
    setIsUrlInText(false);
  }, []);

  const handleLinkSubmit = useCallback(() => {
    if (!editor) return;

    const hasUrlInText = Boolean(linkText.trim() && isUrl(linkText.trim()));
    const _displayText = (linkText || linkUrl).trim();
    let _finalUrl = linkUrl.trim();

    if (hasUrlInText && !_finalUrl) _finalUrl = linkText.trim();
    if (!_finalUrl && !_displayText) return;

    const finalUrl = normalizeUrl(_finalUrl || _displayText);
    const displayText = _displayText;

    const { from, to, empty } = editor.state.selection;

    if (empty) {
      const insertAt = from;
      editor
        .chain()
        .focus()
        .insertContent(displayText)
        .setTextSelection({ from: insertAt, to: insertAt + displayText.length })
        .setLink({ href: finalUrl })
        .setTextSelection(insertAt + displayText.length)
        .unsetAllMarks()
        .run();
    } else {
      editor
        .chain()
        .focus()
        .setLink({ href: finalUrl })
        .setTextSelection(to)
        .unsetAllMarks()
        .run();
    }

    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
    setIsUrlInText(false);
    refreshToolbar();
  }, [editor, linkUrl, linkText, refreshToolbar]);

  const addImage = useCallback(() => fileInputRef.current?.click(), []);
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileUpload(file);
        setShowImageModal(false);
      }
      e.target.value = "";
    },
    [handleFileUpload]
  );

  if (!isMounted || !editor) {
    return (
      <div className={`rounded-lg overflow-hidden ${className}`}>
        <div className="p-3 bg-gray-50 flex flex-wrap items-center gap-1">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="bg-white min-h-[400px] p-4">
          <div className="text-gray-400">Loading editor...</div>
        </div>
      </div>
    );
    }

  return (
    <>
      <div className={`rounded-lg overflow-hidden flex flex-col ${className}`}>
        <div className="border-b border-gray-200 p-3 bg-gray-50 flex flex-wrap items-center gap-1 flex-shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2"
          >
            <Redo className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <div className="relative">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowTextStyleDropdown(!showTextStyleDropdown)}
              className="flex items-center gap-1 px-3 py-2"
            >
              <span className="text-sm">{currentTextStyleLabel()}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
            {showTextStyleDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-[60] min-w-[140px]">
                <button
                  onClick={() => {
                    editor.chain().focus().setParagraph().run();
                    setShowTextStyleDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    toolbar.heading === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  Normal text
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                    setShowTextStyleDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    toolbar.heading === 1 ? "bg-gray-50" : ""
                  }`}
                >
                  Heading 1
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                    setShowTextStyleDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    toolbar.heading === 2 ? "bg-gray-50" : ""
                  }`}
                >
                  Heading 2
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                    setShowTextStyleDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    toolbar.heading === 3 ? "bg-gray-50" : ""
                  }`}
                >
                  Heading 3
                </button>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={toolbar.align === "left" ? "bg-gray-200" : ""}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={toolbar.align === "center" ? "bg-gray-200" : ""}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={toolbar.align === "right" ? "bg-gray-200" : ""}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={toolbar.align === "justify" ? "bg-gray-200" : ""}
            title="Justify"
          >
            <AlignJustify className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={toolbar.bold ? "bg-gray-200" : ""}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={toolbar.italic ? "bg-gray-200" : ""}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={toolbar.underline ? "bg-gray-200" : ""}
            title="Underline"
          >
            <UnderlineIcon className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={toolbar.strike ? "bg-gray-200" : ""}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={toolbar.bulletList ? "bg-gray-200" : ""}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={toolbar.orderedList ? "bg-gray-200" : ""}
            title="Ordered List"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={toolbar.blockquote ? "bg-gray-200" : ""}
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={toolbar.codeBlock ? "bg-gray-200" : ""}
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addLink}
              className={toolbar.linkActive ? "bg-blue-100 text-blue-600" : ""}
              title={
                toolbar.linkActive
                  ? `Remove link (${getCurrentLinkUrl()})`
                  : "Add link"
              }
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
            {toolbar.linkActive && getCurrentLinkUrl() && (
              <span
                className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded max-w-32 truncate"
                title={getCurrentLinkUrl()}
              >
                {getCurrentLinkUrl()}
              </span>
            )}
            {isTypingInLink && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                Press space to end link
              </span>
            )}
          </div>

          <Button type="button" variant="ghost" size="sm" onClick={addImage}>
            <ImageIcon className="w-4 h-4" />
          </Button>
        </div>

        <div
          className={`bg-white flex-1 overflow-y-auto transition-colors relative ${
            isDragOver ? "bg-blue-50 border-2 border-dashed border-blue-300" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <EditorContent editor={editor} />
          {isDragOver && (
            <div className="absolute inset-0 bg-blue-50 bg-opacity-90 flex items-center justify-center z-10">
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                <p className="text-blue-600 font-medium">
                  Drop image here to insert
                </p>
              </div>
            </div>
          )}
        </div>
      </div>


      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div
            className="bg-white rounded-lg p-6 w-96 max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Link</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkUrl("");
                  setLinkText("");
                  setIsUrlInText(false);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent ${
                    linkUrl.trim() && !isUrl(linkUrl.trim())
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLinkSubmit();
                    else if (e.key === "Escape") handleLinkCancel();
                  }}
                  autoFocus
                />
                {linkUrl.trim() && !isUrl(linkUrl.trim()) && (
                  <p className="text-xs text-red-600 mt-1">
                    ⚠ Please enter a valid URL (e.g., https://example.com)
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text to display
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={handleLinkTextChange}
                  placeholder="Link text"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue-500 focus:border-transparent ${
                    isUrlInText
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLinkSubmit();
                    else if (e.key === "Escape") handleLinkCancel();
                  }}
                />
                {isUrlInText && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ URL detected — will be used as both text and link. You can
                    also add a custom display text.
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={handleLinkSubmit}
                  className="flex-1"
                  disabled={
                    !linkUrl.trim() &&
                    !(linkText.trim() && isUrl(linkText.trim()))
                  }
                >
                  Add Link
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLinkCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {showTextStyleDropdown && (
        <div
          className="fixed inset-0 z-[5]"
          onClick={() => setShowTextStyleDropdown(false)}
        />
      )}
      {(showLinkModal || showImageModal) && (
        <div
          className="fixed inset-0 z-[5]"
          onClick={() => {
            setShowLinkModal(false);
            setShowImageModal(false);
          }}
        />
      )}
    </>
  );
}
