import { useState } from "react";
import * as S from "../styles";
import arrowDown from "../../../../assets/arrow-down.svg";
import arrowUp from "../../../../assets/arrow-up.svg";
import clearFilter from "../../../../assets/clearFilter.svg";

import { Tooltip } from "@chakra-ui/react";

interface IFilterActions {
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface Option {
  value: string;
  label: string;
}

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export const FilterStatusActions = ({
  selectedOptions,
  setSelectedOptions,
}: IFilterActions) => {
  const [isOpen, setIsOpen] = useState(false);

  const options: Option[] = [
    { value: "1", label: "A iniciar" },
    { value: "2", label: "Em execução" },
    { value: "3", label: "Executado" },
    { value: "4", label: "Atrasado - A iniciar" },
    { value: "5", label: "Atrasado - A terminar" },
  ];

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  function clearFilterStatus() {
    setSelectedOptions([]);
    setIsOpen(false);
  }

  const handleOptionChange = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
    return (
      <S.CheckboxInput type="checkbox" checked={checked} onChange={onChange} />
    );
  };

  return (
    <>
      <S.SelectWrapper>
        <S.SelectButton onClick={toggleOpen}>
          {selectedOptions.length === 0
            ? "Filtrar"
            : `${selectedOptions.length} opções selecionadas`}
          <img src={isOpen ? arrowDown : arrowUp} alt="" />
        </S.SelectButton>
        {isOpen && (
          <S.CheckboxList>
            <p>STATUS</p>
            {options.map((option) => (
              <S.CheckboxLabel key={option.value}>
                <Checkbox
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleOptionChange(option.value)}
                />
                <span>{option.label}</span>
              </S.CheckboxLabel>
            ))}
          </S.CheckboxList>
        )}
      </S.SelectWrapper>

      <Tooltip label="Limpar filtro status" placement="right-end" hasArrow>
        <S.ButtonFilter onClick={() => clearFilterStatus()}>
          <img src={clearFilter} alt="Limpar filtro" />
        </S.ButtonFilter>
      </Tooltip>
    </>
  );
};
