import { generateRandomId } from '../utils/utilities';

/**
 * Creates a test article with optional custom ID
 * @param id - Optional custom ID (if not provided, a random one will be generated)
 * @returns Test article object
 */
export function getTestArticle(id?: string) {
  const articleId = id || generateRandomId()
  return {
    title: `Test Article ${articleId}`,
    description: 'A comprehensive test article for validation',
    body: 'This article tests the complete lifecycle from creation to deletion. It includes proper validation of all article components including title, description, body content, and tags.',
    tags: ['testing', 'automation', 'playwright']
  }
}

export function getUpdatedArticle(testArticle: { title: string; description: string; body: string; tags: string[] }) {
  return {
    title: `${testArticle.title} updated`,
    description: `${testArticle.description} - This has been updated`,
    body: `${testArticle.body}\n\nUPDATE: This article has been modified with additional content for testing purposes.`,
    tags: testArticle.tags // keep original tags
  }
}
