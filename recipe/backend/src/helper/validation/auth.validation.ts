import { z } from "zod";

export const UserDataValidation = z.object({
    name: z.string().optional(),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }).email("This is not a valid email.").nullish().pipe(z.string()),
    password: z.string({
      required_error: "Password is required"
    }).min(8,{message:"password required at least 8 characters long"}).nullish().pipe(z.string()),
});

export const UserEmailNameValidation = z.object({
    name: z.string().optional(),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email("This is not a valid email.").nullish().pipe(z.string()),
})

export const UpdatePasswordValidation = z.object({
  oldPassword: z.string({
    required_error: "Password is required"
  }).min(8,{message:"password required at least 8 characters long"}).nullish().pipe(z.string()),
  newPassword:z.string({
    required_error: "Password is required"
  }).min(8,{message:"password required at least 8 characters long"}).nullish().pipe(z.string()),
  newPasswordConfirm:z.string({
    required_error: "Password is required"
  }).min(8,{message:"password required at least 8 characters long"}).nullish().pipe(z.string()),
}).refine((data) => data.newPassword === data.newPasswordConfirm, {
  message: "Passwords do not match",
  path: ["newPasswordConfirm"],
});

