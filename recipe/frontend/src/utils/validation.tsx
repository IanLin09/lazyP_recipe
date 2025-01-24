import * as Yup from 'yup';

export const RecipeSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string()
      .required('Required'),
    servings: Yup.number()
      .required('Required'),
    materials: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Name is required'),
        number: Yup.number()
          .min(1, 'Number must be greater than 0')
          .required('Number is required'),
        unit: Yup.string().required('Unit is required'),
      })
    ),
    steps: Yup.array().of(
      Yup.object().shape({
        step: Yup.number().required('step is required'),
        description: Yup.string().required('description is required'),
      })
    ),
});

export const emailSchema = Yup.object().shape({
  email: Yup.string().min(1,"email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i, 'Invalid email format'),
  name: Yup.string().optional()
});

export const passwordSchema = Yup.object({
  oldPassword: Yup.string().min(8).required('Old password is required'),
  newPassword: Yup.string().min(8).required('New password is required'),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required')
});
