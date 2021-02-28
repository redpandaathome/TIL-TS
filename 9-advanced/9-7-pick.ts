{
   type Video = {
      id: string;
      title: string;
      url: string;
      data: string;
   }

   function getVideo(id: string): Video{
      return {
         id,
         title: 'video',
         url: 'https://..',
         data: 'byte-data..',
      };
   }


   // function getVideoMetadata(id: string): Pick<Video, 'id' | 'title'>{
   
   type VideoMetadata = Pick<Video, 'id' | 'title'>;
   function getVideoMetadata(id: string): VideoMetadata {
      return {
         id: id,
         title: 'title'
      }
   }
}