
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuthSession } from '@/hooks/useAuthSession';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import RewardForm, { RewardFormData } from '@/components/RewardForm';
import { useToast } from '@/hooks/use-toast'; // Corrected import path
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Reward = Tables<'rewards'>;

const fetchRewards = async (): Promise<Reward[]> => {
  const { data, error } = await supabase.from('rewards').select('*').order('reward_date', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

const AdminPage = () => {
  const { isAuthenticated, loading: authLoading } = useAuthSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const { data: rewards, isLoading: rewardsLoading, error: rewardsError } = useQuery<Reward[], Error>({
    queryKey: ['rewards'],
    queryFn: fetchRewards,
  });

  const addRewardMutation = useMutation<Reward, Error, RewardFormData>({
    mutationFn: async (newReward) => {
      const { data, error } = await supabase.from('rewards').insert(newReward).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
      toast({ title: 'Success', description: 'Reward added successfully.' });
      setIsAddModalOpen(false);
    },
    onError: (error) => {
      toast({ title: 'Error', description: `Failed to add reward: ${error.message}`, variant: 'destructive' });
    },
  });

  const editRewardMutation = useMutation<Reward, Error, { id: string; updatedReward: RewardFormData }>({
    mutationFn: async ({ id, updatedReward }) => {
      const { data, error } = await supabase.from('rewards').update(updatedReward).eq('id', id).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
      toast({ title: 'Success', description: 'Reward updated successfully.' });
      setIsEditModalOpen(false);
      setSelectedReward(null);
    },
    onError: (error) => {
      toast({ title: 'Error', description: `Failed to update reward: ${error.message}`, variant: 'destructive' });
    },
  });

  const deleteRewardMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('rewards').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
      toast({ title: 'Success', description: 'Reward deleted successfully.' });
      setIsDeleteConfirmOpen(false);
      setSelectedReward(null);
    },
    onError: (error) => {
      toast({ title: 'Error', description: `Failed to delete reward: ${error.message}`, variant: 'destructive' });
    },
  });


  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth?redirect=/admin');
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading || rewardsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-xl">Loading admin panel...</p>
      </div>
    );
  }

  if (!isAuthenticated) { // Should be caught by useEffect, but good for safety
    return null; 
  }
  
  if (rewardsError) {
    return <div className="text-red-500 text-center py-10">Error loading rewards: {rewardsError.message}</div>;
  }

  const handleAddSubmit: React.ComponentProps<typeof RewardForm>['onSubmit'] = (data) => {
    addRewardMutation.mutate(data);
  };

  const handleEditSubmit: React.ComponentProps<typeof RewardForm>['onSubmit'] = (data) => {
    if (selectedReward) {
      editRewardMutation.mutate({ id: selectedReward.id, updatedReward: data });
    }
  };
  
  const openEditModal = (reward: Reward) => {
    setSelectedReward(reward);
    setIsEditModalOpen(true);
  };

  const openDeleteConfirm = (reward: Reward) => {
    setSelectedReward(reward);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedReward) {
      deleteRewardMutation.mutate(selectedReward.id);
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString; // if it's already formatted or invalid
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading text-primary">Manage Rewards</h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Reward
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Reward</DialogTitle>
              <DialogDescription>Fill in the details for the new reward.</DialogDescription>
            </DialogHeader>
            <RewardForm onSubmit={handleAddSubmit} isSubmitting={addRewardMutation.isPending} submitButtonText="Add Reward" />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Link</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rewards?.map((reward) => (
            <TableRow key={reward.id}>
              <TableCell className="capitalize">{reward.type}</TableCell>
              <TableCell>{reward.amount}</TableCell>
              <TableCell>{formatDate(reward.reward_date)}</TableCell>
              <TableCell>
                <a href={reward.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate max-w-xs block">
                  {reward.link}
                </a>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(reward)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => openDeleteConfirm(reward)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Reward</DialogTitle>
            <DialogDescription>Update the details for this reward.</DialogDescription>
          </DialogHeader>
          {selectedReward && (
            <RewardForm
              onSubmit={handleEditSubmit}
              defaultValues={{
                type: selectedReward.type as 'spins' | 'coins',
                amount: selectedReward.amount,
                description: selectedReward.description || '',
                reward_date: selectedReward.reward_date, // Ensure this is YYYY-MM-DD
                link: selectedReward.link,
              }}
              isSubmitting={editRewardMutation.isPending}
              submitButtonText="Save Changes"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the reward for "{selectedReward?.amount} {selectedReward?.type}" on {formatDate(selectedReward?.reward_date || null)}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleteRewardMutation.isPending}>
              {deleteRewardMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
