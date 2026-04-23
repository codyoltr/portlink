import type { AdminApplication, AdminJob, AdminStat, AdminUser } from "../types/admin.types";
export const getAdminStats = async (): Promise<AdminStat[]> => {
  return [
    { title: "Toplam Kullanıcı", value: 124 },
    { title: "Aktif İlan", value: 38 },
    { title: "Bekleyen İlan", value: 12 },
    { title: "Bugünkü Kayıt", value: 7 },
  ];
};

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  return [
    {
      id: "1",
      fullName: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "agent",
      isActive: true,
      createdAt: "2026-04-20",
    },
    {
      id: "2",
      fullName: "Ayşe Demir",
      email: "ayse@example.com",
      role: "subcontractor",
      isActive: false,
      createdAt: "2026-04-18",
    },
    {
      id: "3",
      fullName: "Mehmet Kaya",
      email: "mehmet@example.com",
      role: "technical_expert",
      isActive: true,
      createdAt: "2026-04-17",
    },
  ];
};

export const getAdminJobs = async (): Promise<AdminJob[]> => {
  return [
    {
      id: "1",
      title: "Liman operasyon destek personeli",
      category: "Taşeron",
      ownerName: "Ahmet Yılmaz",
      status: "pending",
      createdAt: "2026-04-22",
    },
    {
      id: "2",
      title: "Gemi bakım teknik destek",
      category: "Teknik Hizmet",
      ownerName: "Ayşe Demir",
      status: "approved",
      createdAt: "2026-04-21",
    },
    {
      id: "3",
      title: "İş ortaklığı fırsatı",
      category: "Partnership",
      ownerName: "Mehmet Kaya",
      status: "rejected",
      createdAt: "2026-04-19",
    },
  ];
};

export const getAdminApplications = async (): Promise<AdminApplication[]> => {
  return [
    {
      id: "1",
      applicantName: "Burak Can",
      jobTitle: "Liman operasyon destek personeli",
      status: "pending",
      createdAt: "2026-04-22",
    },
    {
      id: "2",
      applicantName: "Zeynep Acar",
      jobTitle: "Gemi bakım teknik destek",
      status: "approved",
      createdAt: "2026-04-21",
    },
  ];
};