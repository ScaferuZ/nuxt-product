import { useToast } from "@/components/ui/toast";

export const useNotification = () => {
  const { toast } = useToast();

  const showSuccess = (title: string) => {
    toast({
      title,
      duration: 2000,
    });
  };

  const showError = (title: string) => {
    toast({
      title,
      variant: "destructive",
      duration: 3000,
    });
  };

  return {
    showSuccess,
    showError,
  };
};
