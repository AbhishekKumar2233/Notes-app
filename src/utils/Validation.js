export const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 8 characters long";
  }
  return "";
};

export const validateName = (name) => {
  if (!name.trim()) {
    return "Name is required";
  }
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters long";
  }
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) {
    return "Name can only contain letters and spaces";
  }
  return "";
};

export const validateTitle = (title) => {
  const trimmed = title?.trim();
  if (!trimmed) return "Title is required";
  if (trimmed.length < 3) return "Title must be at least 3 characters";
  if (trimmed.length > 100) return "Title must be under 100 characters";
  if (!/[a-zA-Z]/.test(trimmed)) return "Title must contain letters";

  return null;
};

export const validateDescription = (desc) => {
  if (!desc) return null;
  const trimmed = desc.trim();
  if (trimmed.length > 500)
    return "Description must be under 500 characters";
  return null;
};