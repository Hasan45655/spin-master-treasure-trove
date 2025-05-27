
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tables } from '@/integrations/supabase/types'; // Assuming you have this generated type

export type RewardFormData = Omit<Tables<'rewards'>, 'id' | 'created_at'>;

interface RewardFormProps {
  onSubmit: SubmitHandler<RewardFormData>;
  defaultValues?: Partial<RewardFormData>;
  isSubmitting?: boolean;
  submitButtonText?: string;
}

const rewardSchema = z.object({
  type: z.enum(['spins', 'coins'], { required_error: "Reward type is required." }),
  amount: z.string().min(1, "Amount is required."),
  description: z.string().optional(),
  reward_date: z.string().min(1, "Date is required.") // Consider using date picker and validating format
    .refine(val => /^\d{4}-\d{2}-\d{2}$/.test(val), { message: "Date must be in YYYY-MM-DD format."}),
  link: z.string().url("Link must be a valid URL.").min(1, "Link is required."),
});

const RewardForm: React.FC<RewardFormProps> = ({ onSubmit, defaultValues, isSubmitting, submitButtonText = "Submit" }) => {
  const form = useForm<RewardFormData>({
    resolver: zodResolver(rewardSchema),
    defaultValues: defaultValues || {
      type: 'spins',
      amount: '',
      description: '',
      reward_date: new Date().toISOString().split('T')[0], // Default to today
      link: '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reward type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="spins">Spins</SelectItem>
                  <SelectItem value="coins">Coins</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 25 or 1M" {...field} />
              </FormControl>
              <FormDescription>Enter the quantity of spins or coins.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="reward_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reward Date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="YYYY-MM-DD" {...field} />
              </FormControl>
              <FormDescription>The date the reward is for (YYYY-MM-DD).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com/reward" {...field} />
              </FormControl>
              <FormDescription>The direct URL to collect the reward.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief description of the reward." {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : submitButtonText}
        </Button>
      </form>
    </Form>
  );
};

export default RewardForm;
