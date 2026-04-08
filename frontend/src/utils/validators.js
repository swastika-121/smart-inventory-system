/* ── Auth ── */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email)        return 'Email is required';
  if (!re.test(email)) return 'Enter a valid email address';
  return null;
};

export const validatePassword = (password) => {
  if (!password)           return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
};

export const validateRequired = (value, fieldName = 'This field') => {
  if (value === null || value === undefined || String(value).trim() === '')
    return `${fieldName} is required`;
  return null;
};

/* ── Product ── */
export const validateProduct = (data) => {
  const errors = {};

  if (!data.name?.trim())      errors.name     = 'Product name is required';
  if (!data.category)          errors.category = 'Category is required';
  if (!data.warehouse)         errors.warehouse = 'Warehouse is required';

  const price = parseFloat(data.price);
  if (isNaN(price) || price < 0)
    errors.price = 'Enter a valid price (≥ 0)';

  const stock = parseInt(data.stock, 10);
  if (isNaN(stock) || stock < 0)
    errors.stock = 'Enter a valid stock quantity (≥ 0)';

  const min = parseInt(data.min_stock, 10);
  if (isNaN(min) || min < 0)
    errors.min_stock = 'Enter a valid minimum stock level (≥ 0)';

  return { errors, isValid: Object.keys(errors).length === 0 };
};

/* ── User ── */
export const validateUserForm = (data) => {
  const errors = {};

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;

  if (!data.first_name?.trim()) errors.first_name = 'First name is required';
  if (!data.last_name?.trim())  errors.last_name  = 'Last name is required';
  if (!data.role)               errors.role       = 'Role is required';

  if (data.password) {
    const pwErr = validatePassword(data.password);
    if (pwErr) errors.password = pwErr;
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
};

/* ── Generic form helpers ── */
export const hasErrors  = (errors) => Object.values(errors).some(Boolean);
export const firstError = (errors) => Object.values(errors).find(Boolean) || null;

export const generateSKU = (name = '') => {
  const prefix = name.slice(0, 3).toUpperCase() || 'PRD';
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${random}`;
};