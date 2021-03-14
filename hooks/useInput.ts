import React, {useCallback, useState} from 'react'

type ReturnType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (e: any) => void;
};

const useInput = (initialValue : string = "", rule: [[string | RegExp, React.Dispatch<React.SetStateAction<boolean>>]] | null = null): ReturnType => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((e)=>{
    setValue(e.target.value);
    rule?.map(([str, setError])=>{
      if(!(str instanceof RegExp) && e.target.value !== str){
        //check string
        setError(true);
      }else if(str instanceof RegExp && !e.target.value.match(str)){
        //check RegExp
        setError(true);
      }else{
        setError(false);
      }
    })
  }, [rule]);
  return {value, setValue, onChange};
};

export default useInput;