import React, { useState } from "react";
import "./Form.scss"; 
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    address: "",
    country: "",
    state: "",
    zipCode: "",
    email: "",
    phoneNumber: "",
    heightFt: "",
    heightIn: "",
    weight: "",
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (formData.country === "US" && !formData.state) newErrors.state = "State is required.";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip Code is required.";
    if (!formData.email.trim() || !isEmail(formData.email))
      newErrors.email = "Valid Email is required.";
    if (!formData.phoneNumber.trim() || !isMobilePhone(formData.phoneNumber, "en-US"))
      newErrors.phoneNumber = "Valid Phone Number is required.";
    if (!formData.heightFt || !formData.heightIn) newErrors.height = "Height is required.";
    if (!formData.weight.trim()) newErrors.weight = "Weight is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>React Form</h1>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div>
          <label>Middle Name:</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div>
          <label>Country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="IN">India</option>
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>
        {formData.country === "US" && (
          <div>
            <label>State:</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
            </select>
            {errors.state && <span className="error">{errors.state}</span>}
          </div>
        )}
        <div>
          <label>Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          {errors.zipCode && <span className="error">{errors.zipCode}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
        <div>
          <label>Height:</label>
          <input
            type="number"
            name="heightFt"
            value={formData.heightFt}
            onChange={handleChange}
            placeholder="Feet"
            required
          />
          <input
            type="number"
            name="heightIn"
            value={formData.heightIn}
            onChange={handleChange}
            placeholder="Inches"
            required
          />
          {errors.height && <span className="error">{errors.height}</span>}
        </div>
        <div>
          <label>Weight (kgs):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          {errors.weight && <span className="error">{errors.weight}</span>}
        </div>
        <button type="submit">Save</button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h2>Submitted Data:</h2>
          <p>First Name: {submittedData.firstName}</p>
          <p>Last Name: {submittedData.lastName}</p>
          <p>Middle Name: {submittedData.middleName}</p>
          <p>
            Address: {submittedData.address}, {submittedData.country},{" "}
            {submittedData.state}, {submittedData.zipCode}
          </p>
          <p>Email: {submittedData.email}</p>
          <p>Phone Number: {submittedData.phoneNumber}</p>
          <p>
            Height: {submittedData.heightFt} ft {submittedData.heightIn} in
          </p>
          <p>Weight: {submittedData.weight} kgs</p>
        </div>
      )}
    </div>
  );
}

export default Form;
