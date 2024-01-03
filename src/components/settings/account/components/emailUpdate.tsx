import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const EmailUpdate = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Email and Phone</h2>
      <p className="text-xs text-muted-foreground mt-2">
        Manage the email and phone you use to sign into Base and recieve
        notifications
      </p>

      <form className="flex flex-col gap-6 mt-4 md:w-full sm:w-full md:flex-row sm:flex-row md:gap-12 sm:gap-12">
        <div className="flex flex-col gap-2">
          <div>
            <Label>Email</Label>
          </div>
          <div className="flex flex-col gap-2 md:flex-row sm:flex-row md:items-center sm:items-center">
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
            />
            <Button className="w-20 mt-2 p-1 md:mt-0 sm:mt-0" size="icon">
              Update
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <Label>Phone</Label>
          </div>
          <div className="flex flex-col gap-2 md:flex-row sm:flex-row md:items-center sm:items-center">
            <Input
              id="phone"
              name="phone"
              type="number"
              placeholder="+91-9999999999"
            />
            <Button className="w-20 mt-2 p-1 md:mt-0 sm:mt-0" size="icon">
              Update
            </Button>
          </div>
        </div>
      </form>
      <p className="text-xs text-muted-foreground mt-4">
        For your security, we will send you a code to verify any change to your
        email or phone number
      </p>
      <Separator className="my-8" />
    </div>
  );
};

export default EmailUpdate;
