'use client';

import { useState } from 'react';
import type { Block, FormField } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FormBlockProps {
  block: Block;
}

export function FormBlock({ block }: FormBlockProps) {
  const title = (block.data?.title as string) || 'Form';
  const fields = (block.data?.fields as FormField[]) || [];
  const [values, setValues] = useState<Record<string, any>>({});

  const handleFieldChange = (fieldId: string, value: any) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', values);
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            {field.type === 'text' || field.type === 'email' ? (
              <Input
                id={field.id}
                type={field.type}
                value={values[field.id] || ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                required={field.required}
              />
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.id}
                value={values[field.id] || ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                required={field.required}
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            ) : null}
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
