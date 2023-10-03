class News {
  constructor(news) {
    this.news_id = news.news_id;
    this.title = news.title;
    this.description = news.description;
    this.detail = news.detail;
    this.image = news.coverPath;
    this.created_at = news.created_at;
    this.modified_at = news.modified_at;
    this.recommendation = news.recommendation;
    this.view_number = 0;
    this.title_desc = this.title + this.description;
    this.is_delete = false;
    this.category_id = news.category_id;
    this.user_id = news.user_id;
  }
}

module.exports = News;
