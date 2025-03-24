import React from "react";

const Notification = ({ message, type, onClose }) => {
  const styles = {
    container: {
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 9999,
      padding: "15px 25px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    success: { backgroundColor: "#28a745" },
    error: { backgroundColor: "#dc3545" },
    info: { backgroundColor: "#007bff" },
    closeButton: {
      marginLeft: "15px",
      cursor: "pointer",
      fontSize: "18px",
    },
  };

  return (
    <div style={{ ...styles.container, ...styles[type] }}>
      <span>{message}</span>
      <span style={styles.closeButton} onClick={onClose}>
        &times;
      </span>
    </div>
  );
};

export default Notification;