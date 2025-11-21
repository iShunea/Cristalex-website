import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface BookingModalProps {
  trigger?: React.ReactNode;
  buttonText?: string;
  buttonClassName?: string;
}

export function BookingModal({ trigger, buttonText = "Programare Online", buttonClassName }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger ? (
        <div onClick={() => setIsOpen(true)} data-testid="button-open-booking">
          {trigger}
        </div>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)} 
          className={buttonClassName}
          data-testid="button-open-booking"
        >
          <Calendar className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      )}
      
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 gap-0 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <DialogTitle className="text-xl font-bold text-slate-900">Programare Online - CristAlex Dent</DialogTitle>
        </DialogHeader>
        <div className="w-full flex-1 min-h-0">
          <iframe
            src="https://my.businessdent.md/online-register.php?inst=1718966&ln=ro"
            title="Programare Online CristAlex Dent"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            loading="lazy"
            referrerPolicy="no-referrer"
            data-testid="iframe-booking"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
