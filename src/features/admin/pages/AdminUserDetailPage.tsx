import { useParams } from "react-router-dom";

const AdminUserDetailPage = () => {
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
      <h1>Kullanıcı Detay</h1>
      <p>Kullanıcı ID: {id}</p>
      <p>Buraya kullanıcı detay bilgileri gelecek.</p>
    </div>
  );
};

export default AdminUserDetailPage;