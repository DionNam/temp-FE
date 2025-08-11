export interface DemoFormData {
  name: string;
  employees: string;
  timeline: string;
  agency: string;
}

export interface DemoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: DemoFormData;
  setFormData: (data: DemoFormData) => void;
}