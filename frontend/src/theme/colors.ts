/**
 * Definição das cores para o tema da aplicação Solidários
 * Baseado no guia de estilo visual fornecido
 */

export const lightColors = {
  // Cores Primárias
  primary: {
    main: "#173F5F", // Azul Marinho - cor principal
    secondary: "#006E58", // Verde Turquesa - cor secundária
    accent: "#B89700", // Amarelo - cor de destaque
  },

  // Cores Neutras
  neutral: {
    white: "#FFFFFF", // Fundo principal
    lightGray: "#F6F6F6", // Fundo secundário
    mediumGray: "#E2E8F0", // Bordas, linhas divisórias
    darkGray: "#64748B", // Textos secundários
    black: "#1E293B", // Textos principais
  },

  // Cores de Status
  status: {
    success: "#10B981", // Verde Sucesso
    error: "#EF4444", // Vermelho Alerta
    warning: "#F59E0B", // Amarelo Aviso
    info: "#3B82F6", // Azul Informação
  },

  // Badges de Status (para itens)
  badges: {
    available: {
      background: "#DCFCE7",
      text: "#166534",
    },
    reserved: {
      background: "#FEF9C3",
      text: "#854D0E",
    },
    distributed: {
      background: "#FEE2E2",
      text: "#991B1B",
    },
    lowStock: {
      background: "#FEF3C7",
      text: "#92400E",
    },
  },

  // Notificações
  notifications: {
    success: {
      background: "#DCFCE7",
      icon: "#16A34A",
      text: "#166534",
    },
    error: {
      background: "#FEE2E2",
      icon: "#DC2626",
      text: "#991B1B",
    },
    warning: {
      background: "#FEF3C7",
      icon: "#F59E0B",
      text: "#92400E",
    },
    info: {
      background: "#DBEAFE",
      icon: "#3B82F6",
      text: "#1E40AF",
    },
  },
};

// Versão escura (valores simples — ajustar conforme o design)
export const darkColors = {
  primary: {
    main: "#9FB8D6",
    secondary: "#6BD1B0",
    accent: "#E0C76A",
  },
  neutral: {
    white: "#0B1220",
    lightGray: "#0F1724",
    mediumGray: "#1F2A36",
    darkGray: "#9AA7B7",
    black: "#E6EEF8",
  },
  status: {
    success: "#34D399",
    error: "#F87171",
    warning: "#FBBF24",
    info: "#60A5FA",
  },
  badges: {
    available: { background: "#08312A", text: "#A7F3D0" },
    reserved: { background: "#3B2F00", text: "#FDE68A" },
    distributed: { background: "#2B0E0E", text: "#FECACA" },
    lowStock: { background: "#3B2F00", text: "#FDE68A" },
  },
  notifications: {
    success: { background: "#052E1C", icon: "#10B981", text: "#A7F3D0" },
    error: { background: "#2A0C0C", icon: "#DC2626", text: "#FECACA" },
    warning: { background: "#2A2106", icon: "#F59E0B", text: "#FDE68A" },
    info: { background: "#07112B", icon: "#3B82F6", text: "#BFDBFE" },
  },
};

export default lightColors;
