'use strict';

/**
 * AI Assistant controller
 * Custom endpoints for AI-powered writing features
 */

module.exports = {
  /**
   * Generate article outline
   */
  async generateOutline(ctx) {
    try {
      const { topic, tone, targetLength } = ctx.request.body;
      
      if (!topic) {
        return ctx.badRequest('Topic is required');
      }
      
      const outline = await strapi.service('ai').generateOutline(topic, tone, targetLength);
      
      return ctx.send({
        data: outline
      });
    } catch (error) {
      return ctx.internalServerError('Failed to generate outline');
    }
  },

  /**
   * Enhance content
   */
  async enhanceContent(ctx) {
    try {
      const { content, type } = ctx.request.body;
      
      if (!content) {
        return ctx.badRequest('Content is required');
      }
      
      const enhancements = await strapi.service('ai').enhanceContent(content, type);
      
      return ctx.send({
        data: enhancements
      });
    } catch (error) {
      return ctx.internalServerError('Failed to enhance content');
    }
  },

  /**
   * Discover story ideas
   */
  async discoverStories(ctx) {
    try {
      const { category, sources } = ctx.request.body;
      
      const stories = await strapi.service('ai').discoverStories(category, sources);
      
      return ctx.send({
        data: stories
      });
    } catch (error) {
      return ctx.internalServerError('Failed to discover stories');
    }
  },

  /**
   * Extract insights from research
   */
  async extractInsights(ctx) {
    try {
      const { content } = ctx.request.body;
      
      if (!content) {
        return ctx.badRequest('Content is required');
      }
      
      const insights = await strapi.service('ai').extractInsights(content);
      
      return ctx.send({
        data: insights
      });
    } catch (error) {
      return ctx.internalServerError('Failed to extract insights');
    }
  },

  /**
   * Generate SEO metadata
   */
  async generateSEO(ctx) {
    try {
      const { content, keywords } = ctx.request.body;
      
      if (!content) {
        return ctx.badRequest('Content is required');
      }
      
      const seoData = await strapi.service('ai').generateSEO(content, keywords);
      
      return ctx.send({
        data: seoData
      });
    } catch (error) {
      return ctx.internalServerError('Failed to generate SEO');
    }
  },

  /**
   * Analyze content
   */
  async analyzeContent(ctx) {
    try {
      const { content } = ctx.request.body;
      
      if (!content) {
        return ctx.badRequest('Content is required');
      }
      
      const analysis = await strapi.service('ai').analyzeContent(content);
      
      return ctx.send({
        data: analysis
      });
    } catch (error) {
      return ctx.internalServerError('Failed to analyze content');
    }
  },

  /**
   * Generate citations
   */
  async generateCitations(ctx) {
    try {
      const { reference, formats } = ctx.request.body;
      
      if (!reference) {
        return ctx.badRequest('Reference is required');
      }
      
      const citations = await strapi.service('ai').generateCitations(reference, formats);
      
      return ctx.send({
        data: citations
      });
    } catch (error) {
      return ctx.internalServerError('Failed to generate citations');
    }
  }
};
