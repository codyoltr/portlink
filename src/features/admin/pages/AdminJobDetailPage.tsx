import { useParams } from "react-router-dom";

const AdminJobDetailPage = () => {
  const { id } = useParams();

  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <h1>İlan Detay</h1>
      <p>İlan ID: {id}</p>
      <p>Buraya ilan detay bilgileri gelecek.</p>
    </div>
  );
};

export default AdminJobDetailPage;