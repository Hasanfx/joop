import { z } from "zod";
import RegisterSchema, { registerSchema } from "./registerSchema";

const employerSchema = registerSchema.extend({
  companyName: z.string().min(1, "Company name is required"),
  companyWebsite: z.string().url("Invalid URL").optional(),
});

class EmployerSchema extends RegisterSchema {
  public companyName: string;
  public companyWebsite?: string;

  constructor(data: any) {
    const { name, email, password, role } = data;
    const { companyWebsite, companyName } = data;
    super({ name, email, password, role });
    const parsed = employerSchema.parse({ companyWebsite, companyName });
    this.companyName = parsed.companyName;
    this.companyWebsite = parsed.companyWebsite;
  }

  static validate(data: any) {
    const validate = employerSchema.safeParse(data);
    if (validate.success) return null;
    return validate.error.errors.map((err) => err.message) as string[];
  }
}

export default EmployerSchema;
