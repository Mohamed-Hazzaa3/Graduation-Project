"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function FormType({ selected, setSelected }) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="border border-primary-800 flex">
      <Button
        handleClick={() => setSelected("old")}
        activeFilter={selected}
        filter="old"
      >
        {mounted ? t("room.nav.old") : "Loading..."}
      </Button>
      <Button
        handleClick={() => setSelected("new")}
        activeFilter={selected}
        filter="new"
      >
        {mounted ? t("room.nav.new") : "Loading..."}
      </Button>
    </div>
  );
}

function Button({ filter, children, handleClick, activeFilter }) {
  return (
    <button
      className={`px-5 py-4 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={handleClick} // ✅ تمرير الدالة بشكل صحيح
    >
      {children}
    </button>
  );
}

export default FormType;
