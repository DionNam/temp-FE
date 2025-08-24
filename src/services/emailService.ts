import React from 'react';

export interface DemoFormData {
  agencyName?: string;
  email: string;
  name: string;
  employees: string;
  timeline: string;
  agency: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api/v1';

export const sendDemoEmail = async (formData: DemoFormData): Promise<boolean> => {
  try {
    console.log('Sending demo request to:', `${API_URL}/demo-requests`);

    const response = await fetch(`${API_URL}/demo-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        employees: formData.employees,
        timeline: formData.timeline,
        agency: formData.agency,
        agency_name: formData.agency === 'yes' ? formData.agencyName : null,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Demo request sent successfully:', result);
      return true;
    } else {
      const error = await response.json();
      console.error('Failed to send demo request:', error);
      return false;
    }
  } catch (error) {
    console.error('Error sending demo request:', error);
    return false;
  }
};

export const openGmail = (): void => {
  window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
};

export const useDemoForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [submitError, setSubmitError] = React.useState<string>('');

  const submitDemoForm = async (formData: DemoFormData): Promise<boolean> => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const success = await sendDemoEmail(formData);

      if (success) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof window !== 'undefined' && (window as any).gtag) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).gtag('event', 'demo_request_submitted', {
            email: formData.email,
            employees: formData.employees,
            agency: formData.agency
          });
        }

        return true;
      } else {
        setSubmitError('Failed to send demo request. Please try again or contact us directly.');
        return false;
      }
    } catch (error) {
      console.error('Demo form submission error:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitError,
    submitDemoForm,
    clearError: () => setSubmitError('')
  };
};

export interface DemoRequestResponse {
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    employees: string;
    timeline: string;
    agency: string;
    agency_name?: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
}

export const getAllDemoRequests = async (): Promise<DemoRequestResponse[]> => {
  try {
    const response = await fetch(`${API_URL}/demo-requests`);
    if (response.ok) {
      const result = await response.json();
      return result.data;
    }
    throw new Error('Failed to fetch demo requests');
  } catch (error) {
    console.error('Error fetching demo requests:', error);
    throw error;
  }
};

export const updateDemoRequestStatus = async (id: number, status: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/demo-requests/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error updating demo request status:', error);
    return false;
  }
};