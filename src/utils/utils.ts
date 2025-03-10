import moment from 'moment';

export const formattedDate = (dateString: string) => {
  return moment(dateString).format('MMMM Do YYYY, h:mm A');
};

export const CapitalizeFirstLetter = (string: any) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1).toLowerCase();
};

export const getTableIndexNumber = (page: number, index: number, limit: number) => {
  return (page - 1) * limit + (index + 1);
};

export const copyToClipboard = (text: string, setCopied: any) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    })
    .catch((err) => console.error('Could not copy text: ', err));
};

export const calculateSubmenuCount = (menu, user) => {
  let submenuCount = -1;

  if (menu.options.length > 0) {
    menu.options.forEach((submenu) => {
      const hasPermission = submenu.permissions.some((permission) => user.adminPermissions.includes(permission));
      if (hasPermission) {
        submenuCount++;
      }
    });
  } else {
    submenuCount++;
  }

  return submenuCount;
};

export const downloadCSV = (data: any[], filename: string = "users.csv") => {
  // convert data to CSV
  const header = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map(obj => Object.values(obj).join(",")).join("\n");
  const csvData = header + rows;

  // create a Blob and trigger download
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};