<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>delix</title>
  </head>
  <body>
    <form class="" action="/v1/company" method="post" enctype="multipart/form-data">
      <input type="hidden" name="_token" value="<?php echo csrf_token() ?>">
      <input type="text" name="name" value="">

      <input type="email" name="email" value="">

      <input type="phone" name="phone" value="">

      <input type="text" name="location" value="">

      <input type="url" name="website" value="">

      <input type="file" name="logo" value="">

      <input type="file" name="background_image" value="">

      <input type="time" name="start_at_hh" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" placeholder="24hs format" value="">

      <input type="text" name="end_at_hh" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" placeholder="24hs format" value="">

      <input type="text" name="days" value="">

      <input type="number" name="capacity_max" value="">

      <select class="" name="extends_tables">
        <option value="0">No</option>
        <option value="1">Yes</option>
      </select>

      <button type="send" name="button">enviar</button>
    </form>
  </body>
</html>
