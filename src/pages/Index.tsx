import StudentRegistrationForm from "@/components/StudentRegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Student Registration</h1>
          <p className="text-lg text-muted-foreground">Complete your registration in just two simple steps</p>
        </div>
        <StudentRegistrationForm />
      </div>
    </div>
  );
};

export default Index;
