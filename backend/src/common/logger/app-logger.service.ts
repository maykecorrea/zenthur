import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppLoggerService implements LoggerService {
  private logsDir = path.join(process.cwd(), 'logs');
  
  constructor() {
    // Criar diretório de logs se não existir
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  log(message: any, context?: string) {
    this.writeLog('info', message, context);
    console.log(`[${context || 'Application'}] ${message}`);
  }

  error(message: any, trace?: string, context?: string) {
    this.writeLog('error', message, context, trace);
    console.error(`[${context || 'Application'}] ERROR: ${message}`);
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: any, context?: string) {
    this.writeLog('warn', message, context);
    console.warn(`[${context || 'Application'}] WARN: ${message}`);
  }

  debug(message: any, context?: string) {
    if (process.env.NODE_ENV !== 'production') {
      this.writeLog('debug', message, context);
      console.debug(`[${context || 'Application'}] DEBUG: ${message}`);
    }
  }

  verbose(message: any, context?: string) {
    if (process.env.NODE_ENV !== 'production') {
      this.writeLog('verbose', message, context);
      console.log(`[${context || 'Application'}] VERBOSE: ${message}`);
    }
  }

  private writeLog(level: string, message: any, context?: string, trace?: string) {
    const now = new Date();
    const logFile = path.join(this.logsDir, `${now.toISOString().split('T')[0]}.log`);
    
    const logEntry = `[${now.toISOString()}] [${level.toUpperCase()}] [${context || 'Application'}]: ${message}${trace ? '\n' + trace : ''}\n`;
    
    fs.appendFileSync(logFile, logEntry);
  }
}