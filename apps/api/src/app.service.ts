import { Injectable } from '@nestjs/common';

export interface Languages {
  createdAt: Date;
  language: string;
  greet: string;
}

@Injectable()
export class AppService {
  private languages: Languages[] = [
    {
      createdAt: new Date(),
      language: 'English',
      greet: 'Hello',
    },
    {
      createdAt: new Date(),
      language: 'French',
      greet: 'Bonjour',
    },
    {
      createdAt: new Date(),
      language: 'Spanish',
      greet: 'Hola',
    },
    {
      createdAt: new Date(),
      language: 'German',
      greet: 'Hallo',
    },
    {
      createdAt: new Date(),
      language: 'Swahili',
      greet: 'Habari',
    },
  ];
  availableLanguages() {
    return this.languages;
  }
}
