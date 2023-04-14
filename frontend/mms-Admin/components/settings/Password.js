import React, { useState } from "react"
import styles from "../componentStyles/password.module.css";
import Link from "next/link";
import { Input } from "antd";

function Password() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <div className={styles.password_main}>
         <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.current_sub_div}>
                <div className={styles.current_label_div}>
                   <label htmlFor="current password">Current password</label>
                </div>
                <div className={styles.firstpassword_div}>
                    <Input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    required
                    className={styles.currentPassword}
                    placeholder="Your current password"
                    />
                </div>
            </div>
            <div className={styles.new_sub_div}>
                <div className={styles.new_label_div}>
                   <label htmlFor="new password">New password</label>
                </div>
                <div className={styles.newpassword_div}>
                    <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    required
                    className={styles.newPassword}
                    placeholder="Must be at least 8 characters"
                    />
                </div>
            </div>
            <div className={styles.con_new_sub_div}>
                <div className={styles.con_new_label_div}>
                   <label htmlFor="con new password">Confirm new password</label>
                </div>
                <div className={styles.con_newpassword_div}>
                    <Input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleInputChange}
                    required
                    className={styles.confirmNewPassword}
                    placeholder="Must match your new password"
                    />
                </div>
            </div>
            <button type="submit" className={styles.button}>
               Save new password
            </button>
         </form>
         <Link href="#">
              <a className={styles.sub_div_link}>
               <span>
                  Forgot password?
               </span>
              </a>
            </Link>
        </div>
    )
}

export default Password;