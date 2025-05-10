import React, { createContext } from "react";

interface OrganizationContextProps {
  organization: string;
  setOrganization: (organization: string) => void;
}

const OrganizationContext = createContext<OrganizationContextProps>({
  organization: "lemoncode",
  setOrganization: () => {},
});

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [organization, setOrganization] = React.useState<string>("lemoncode");

  return (
    <OrganizationContext.Provider value={{ organization, setOrganization }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = React.useContext(OrganizationContext);
  if (!context) {
    throw new Error(
      "useOrganization must be used within an OrganizationProvider"
    );
  }
  return context;
};
