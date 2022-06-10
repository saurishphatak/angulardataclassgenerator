import { IDataClassService } from "./IFieldDetailsService";

export interface IDataClassLanguageComponent {
  // Each language component will share a common
  // service related to that language
  languageService: IDataClassService;
}
