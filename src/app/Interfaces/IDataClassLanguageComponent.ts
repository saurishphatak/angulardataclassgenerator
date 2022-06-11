import { IDataClassService } from "./IDataClassService";
import { ILoaderService } from "./ILoaderService";

export interface IDataClassDetailsFormComponent {
  // Each class details component will share a common
  // service related to that language
  languageService: IDataClassService;

  // Each data class details will also hold a reference to the
  // loader service
  loaderService: ILoaderService;
}
