export const validationMessages = {
    generic: [
      { type: 'required', message: 'El campo es obligatorio' },
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'El email no es válido' },
      { type: 'minlength', message: 'El email debe tener al menos 10 caracteres' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 4 caracteres' },
      { type: 'maxlength', message: 'La contraseña debe tener maximo 64 caracteres' },
    ],
    form: [
      { type: 'equals', message: 'La contraseña debe coincidir' },
    ]
  };