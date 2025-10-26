<!-- belajar php -->
<h1>saya belajar php</h1>
<?php
    $nama = "Rafa izzaul h";
    $kelas = "X-RPL";
    $umur = "16";
    $alamat = "sidokare";
    $hobi = "Bersepeda dan Main Game";
    $enter = "<br>";

echo $nama;
echo $enter;
echo $kelas;

echo'saya kelas';
echo'10';
echo'<br>';
echo'nama:Rafa izzaul h <br>';
echo'kelas:X-RPL <br>';
echo'alamat:sidokare <br>';
echo'hobi:Bersepeda dan Main Game <br>';
echo'umur:16 <br>';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>web Rafa</title>
</head>
<body>
    <div>
        <h1>identitas</h1>
        <table>
            <tbody>
                <tr>
                    <td>nama: <?=$nama?></td>
                </tr>
                <tr>
                    <td>kelas: <?=$kelas?></td>
                </tr>
                <tr>
                    <td>umur: <?=$umur?></td>
                </tr>
                <tr>
                    <td>alamat: <?=$alamat?></td>
                </tr>
                <tr>
                    <td>hobi: <?=$hobi?></td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>