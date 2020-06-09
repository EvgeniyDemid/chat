import { MongooseModule } from '@nestjs/mongoose';

export const mongodbModule = MongooseModule.forRoot(process.env.MONGODB_WRITE_CONNECTION_STRING,
    {
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useFindAndModify: false,
      useCreateIndex :true
    }
)