"use client";

import { useState } from "react";
import FormType from "./FormType";
import ReservationFormOld from "./ReservationFormOld";
import LoginMessage from "./LoginMessage";
import ReservationFormNew from "./ReservationFormNew";

function ReservationContent({
  country,
  governorates,
  schools,
  colleges,
  cabin,
}) {
  const [selected, setSelected] = useState("old");
  return (
    <div className="grid border border-primary-800 min-h-[400px]">
      <FormType selected={selected} setSelected={setSelected} />

      {selected === "old" ? (
        <ReservationFormOld
          country={country}
          governorates={governorates}
          colleges={colleges}
          cabin={cabin}
        />
      ) : (
        <ReservationFormNew
          country={country}
          governorates={governorates}
          schools={schools}
          colleges={colleges}
          cabin={cabin}
        />
      )}
    </div>
  );
}

export default ReservationContent;
