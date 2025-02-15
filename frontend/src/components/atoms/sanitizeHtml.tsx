import DOMPurify from 'dompurify'

export const sanitizeHtml = (content: string | undefined) => {
  if (!content) return '';

  const sanitizedContent = DOMPurify.sanitize(content);
  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}
