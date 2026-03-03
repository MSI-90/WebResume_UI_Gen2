import type {ILoaderProps} from "@shared/ui/loader/types/loader.interfaces.ts";

export default function Loader({type}: ILoaderProps) {
  let loaderText: string = '';
  switch (type) {
    case 'social':
      loaderText = 'Загрузка списка выбора социальных сетей';
      break;
    case 'default':
      loaderText = 'Загрузка';
      break;
    default:
      loaderText = 'Загрузка';
      break;
  }

  return (
    <>
      <span className={'loading'}>
        {loaderText}
      </span>
    </>
  )
}