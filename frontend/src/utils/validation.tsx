import { Formik, Form, Field, ErrorMessage } from 'formik';
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
