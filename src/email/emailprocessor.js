import { OpenAI } from 'openai';
import { config } from '../config/comfig';

const openai = new OpenAI({ apiKey: config.openai.apiKey });

export class EmailProcessor {
  async categorizeEmail(emailData) {
    const prompt = `
      Analyze this email and categorize it as one of the following:
      - Interested
      - Not Interested
      - More Information

      Email Subject: ${emailData.subject}
      Email Body: ${emailData.body}
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    return completion.choices[0].message.content || 'More Information';
  }

  async generateResponse(emailData, category) {
    const prompt = `
      Generate an appropriate email response based on this category: ${category}
      
      Original Email Subject: ${emailData.subject}
      Original Email Body: ${emailData.body}

      If the category is "Interested", suggest a demo call with specific times.
      If "More Information", provide relevant details about our services.
      If "Not Interested", send a polite acknowledgment.
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    return completion.choices[0].message.content || '';
  }
}
