import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AdsService {
  private readonly adsDirectory = path.join(process.cwd(), 'uploads', 'Ads');

  constructor() {
    this.ensureAdsDirectoryExists();
  }

  private ensureAdsDirectoryExists() {
    if (!fs.existsSync(this.adsDirectory)) {
      fs.mkdirSync(this.adsDirectory, { recursive: true });
    }
  }

  saveVideo(filename: string) {
    return { message: 'Video uploaded successfully!', filename };
  }

  getAllVideos() {
    try {
      this.ensureAdsDirectoryExists();
      
      const files = fs.readdirSync(this.adsDirectory);

      if (files.length === 0) {
        throw new NotFoundException('No ads found.');
      }

      return files.map(file => ({
        url: `/uploads/Ads/${file}`,  
        filename: file,
      }));
    } catch (error) {
      console.error('Error fetching ads:', error.message);
      throw new NotFoundException(`Could not retrieve ads: ${error.message}`);
    }
  }
}
