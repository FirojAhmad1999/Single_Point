import React from "react";
import { MoreHorizontal } from "lucide-react";
import Button from "./ui/Button";
import { Card, CardHeader } from "./ui/Card";

const CompanyDetails = ({ companyName, address, email }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-100 mb-1">{companyName}</h2>
          <p className="text-gray-400 text-sm">{address} · {email}</p>
        </div>
        <Button variant="ghost" className="px-2">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </CardHeader>
    </Card>
  );
};

export default CompanyDetails;