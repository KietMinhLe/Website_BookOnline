// User Model
export class User {
  constructor(id, email, password, firstName, lastName, phone, address, role = 'customer') {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
    this.role = role;
    this.isActive = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Getter methods
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  isAdmin() {
    return this.role === 'admin';
  }

  isCustomer() {
    return this.role === 'customer';
  }

  // Methods
  updateProfile(data) {
    this.firstName = data.firstName || this.firstName;
    this.lastName = data.lastName || this.lastName;
    this.phone = data.phone || this.phone;
    this.address = data.address || this.address;
    this.updatedAt = new Date();
  }

  changePassword(newPassword) {
    this.password = newPassword;
    this.updatedAt = new Date();
  }

  // Static methods
  static fromJSON(json) {
    const user = new User(
      json.id,
      json.email,
      json.password,
      json.firstName,
      json.lastName,
      json.phone,
      json.address,
      json.role
    );
    user.isActive = json.isActive;
    user.createdAt = new Date(json.createdAt);
    user.updatedAt = new Date(json.updatedAt);
    return user;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      role: this.role,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

