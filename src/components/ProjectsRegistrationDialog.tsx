import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UnifiedContactForm } from "@/components/UnifiedContactForm";

interface ProjectsRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sector: string;
}

export const ProjectsRegistrationDialog = ({ open, onOpenChange, sector }: ProjectsRegistrationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Solicitar información de proyectos - {sector}</DialogTitle>
          <DialogDescription>
            Completa el formulario para acceder a nuestros proyectos de {sector.toLowerCase()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <UnifiedContactForm 
            onSuccess={() => onOpenChange(false)}
            showInDialog={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};