import { getMongoManager } from "typeorm";
import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { NewsEntity } from "../../../db/entities/news";
// import { NewsInput } from "../../../../client/service/types/types";

export class NewsContextHelper extends AbstractRequestContextHelper {
    public async getAll() {
        const manager = getMongoManager();
        const result = await manager.find(NewsEntity);
        return result;
    }

    public addNews(title: string, content: string) {
        const news = new NewsEntity();
        news.content = content;
        news.title = title;
        const manager = getMongoManager();
        manager.save(news);
        return true;
    }

    public async updateNews(value: any) {
        const manager = getMongoManager();
        manager.update("news", value._id, {
            content: value.content,
            title: value.title,
        });
        return true;
    }
    public async deleteNews(id: string) {
        const manager = getMongoManager();
        manager.delete("news", id);
        return true;
    }
}
