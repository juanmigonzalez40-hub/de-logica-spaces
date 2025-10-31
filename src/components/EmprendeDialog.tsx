import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const EmprendeDialog = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el diálogo ya se mostró anteriormente
    const hasSeenDialog = localStorage.getItem("emprendeDialogShown");
    
    if (!hasSeenDialog) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    // Marcar que el usuario ya vio el diálogo
    localStorage.setItem("emprendeDialogShown", "true");
    setOpen(false);
  };

  const handleAction = () => {
    localStorage.setItem("emprendeDialogShown", "true");
    setOpen(false);
    navigate("/contacto");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleClose();
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">¿Eres emprendedor?</DialogTitle>
          <DialogDescription className="text-base pt-4">
            ¿Es tu primer negocio? Pregúntanos por el <strong>plan Emprende</strong>, con condiciones ventajosas para ti.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button onClick={handleAction} size="lg" variant="primary">
            Solicitar propuesta
          </Button>
          <Button onClick={handleClose} variant="outline" size="lg">
            Continuar navegando
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
