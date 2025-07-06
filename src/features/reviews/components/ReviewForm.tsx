// src/features/reviews/components/ReviewForm.tsx

import { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Radio } from '../../../components/ui/Radio';
import { Button } from '../../../components/ui/Button';

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    rating: '5',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Submitted:', formData);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Review submitted!');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Leave a Review</h2>

      <Input
        name="title"
        label="Title"
        placeholder="Amazing product!"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <Textarea
        name="message"
        label="Message"
        placeholder="Tell us about your experience..."
        value={formData.message}
        onChange={handleChange}
        required
      />

      <Radio
        name="rating"
        label="Rating"
        value={formData.rating}
        onChange={handleChange}
        options={[
          { label: '1 Star', value: '1' },
          { label: '2 Stars', value: '2' },
          { label: '3 Stars', value: '3' },
          { label: '4 Stars', value: '4' },
          { label: '5 Stars', value: '5' },
        ]}
      />

      <Button type="submit" isLoading={loading}>
        Submit Review
      </Button>
    </form>
  );
}
