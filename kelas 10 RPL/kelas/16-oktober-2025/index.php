<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
<link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="./style.css">
</head>
<body>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Rafa</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page"href="?menu=profil">PROFIL</a>
        </li>
                <li class="nav-item"><a href="?menu=sejarah" class="nav-link active">sejarah</a></li>
                <li class="nav-item"><a href="?menu=jurusan" class="nav-link active">jurusan</a></li>
                <li class="nav-item"><a href="?menu=prestasi" class="nav-link active">prestasi</a></li>
                <li class="nav-item"><a href="?menu=kegiatan" class="nav-link active">kegiatan</a></li>
                <li class="nav-item"><a href="?menu=kontak" class="nav-link active">kontak</a></li>
      </form>
    </div>
  </div>
</nav>

        <nav>
            <!-- <ol>
                <li><a href="?menu=profil">Profil</a></li>
                <li><a href="?menu=sejarah">sejarah</a></li>
                <li><a href="?menu=jurusan">jurusan</a></li>
                <li><a href="?menu=prestasi">prestasi</a></li>
                <li><a href="?menu=kegiatan">kegiatan</a></li>
                <li><a href="?menu=kontak">kontak</a></li>
            </ol> -->
        </nav>

        <section class=rapih>
            <?php
            if (isset($_GET['menu'])) {
                $isi = $_GET['menu'];
            

                if ($isi == "sejarah") {
                    require_once("pages/sejarah.php");
                }

                if ($isi == "profil") {
                    require_once("pages/profil.php");
                }

                if ($isi == "jurusan") {
                    require_once("pages/jurusan.php");
                }

                if ($isi == "prestasi") {
                    require_once("pages/prestasi.php");
                }

                if ($isi == "kegiatan") {
                    require_once("pages/kegiatan.php");
                }

                if ($isi == "kontak") {
                    require_once("pages/kontak.php");
                }


            }
            ?>
        </section>

        <footer class=rapih>
            <div class="card rapih" style="margin-top: 50px;">
                <div class="card-body">
                    <figure>
                        <figcaption>
                            web ini di buat oleh <cite title="soure title">Rafa</cite>
                        </figcaption>
                    </figure>

                </div>
            </div>
        </footer>
    </div>
</body>
</html>