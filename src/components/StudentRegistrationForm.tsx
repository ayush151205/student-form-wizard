import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, User, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
});

type FormData = z.infer<typeof formSchema>;

const StudentRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData | null>(null);

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    setFormData(data);
    setCurrentStep(2);
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleFinalSubmit = () => {
    toast({
      title: "Registration Successful!",
      description: `Welcome, ${formData?.name}! Check your email for confirmation.`,
    });
    // Reset form
    setCurrentStep(1);
    setFormData(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-lg border-2">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                currentStep >= 1 ? "bg-step-active text-primary-foreground" : "bg-step-inactive text-background"
              }`}>
                {currentStep > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
              </div>
              <div className="text-sm font-medium">Details</div>
            </div>
            
            <div className="flex-1 h-1 mx-4 bg-border rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ${
                currentStep >= 2 ? "bg-step-complete w-full" : "bg-step-inactive w-0"
              }`} />
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                currentStep >= 2 ? "bg-step-active text-primary-foreground" : "bg-step-inactive text-background"
              }`}>
                {currentStep > 2 ? <CheckCircle2 className="w-5 h-5" /> : "2"}
              </div>
              <div className="text-sm font-medium">Summary</div>
            </div>
          </div>
          
          <div>
            <CardTitle className="text-2xl font-bold">Student Registration</CardTitle>
            <CardDescription>
              {currentStep === 1 ? "Enter your details to get started" : "Review your information"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-left-4 duration-500">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    {...register("name")}
                    className="h-11"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email")}
                    className="h-11"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    type="button" 
                    onClick={handleNext}
                    size="lg"
                    className="min-w-32"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && formData && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <div className="rounded-lg bg-muted p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Registration Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-md bg-card">
                      <User className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                        <p className="font-medium">{formData.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-md bg-card">
                      <Mail className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    onClick={handleBack}
                    variant="outline"
                    size="lg"
                    className="min-w-32"
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleFinalSubmit}
                    size="lg"
                    className="min-w-32"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRegistrationForm;
