import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EmailUpdate = () => {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold">Email and Phone</h2>
      <p className="text-xs text-muted-foreground mt-2">
        Manage the email and phone you use to sign into Base and recieve
        notifications
      </p>

      <form className="flex flex-col gap-6 mt-4">
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            type="email"
          />
          <Button size="sm">Update</Button>
        </div>

        <div>
          <Label>Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="number"
            placeholder="+91-9999999999"
          />
          <Button size="sm">Update</Button>
        </div>
      </form>
    </div>
  );
};

export default EmailUpdate;
