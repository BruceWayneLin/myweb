<?php if ($modules) { ?>
<div class="container">
    <div class="row">
        <div class="col-sm-3">
            <div class="sidebar-nav">
                <?php if ($categories) { ?>
                <div id="nav-wayne" class="navbar navbar-default" role="navigation">
                    <div class="navbar-header">
                        <button id="navbarbar" type="button" class="btn btn-navbar navbar-toggle" data-toggle="collapse"  data-target=".sidebar-navbar-collapse"><i class="fa fa-bars"></i></button>

                    </div>
                    <div class="navbar-collapse collapse sidebar-navbar-collapse">
                        <ul class="nav navbar-nav">
                            <?php foreach ($categories as $category) { ?>
                            <?php if ($category['children']) { ?>
                            <li class="dropdown"><a href="<?php echo $category['href']; ?>" class="dropdown-toggle" data-toggle="dropdown"><?php echo $category['name']; ?></a>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <div class="dropdown-inner">
                                    <?php foreach (array_chunk($category['children'], ceil(count($category['children']) / $category['column'])) as $children) { ?>
                                        <ul class="list-unstyled">
                                            <?php foreach ($children as $child) { ?>
    <li class="list-group-item">
        <a href="<?php echo $child['href']; ?>"><?php echo $child['name']; ?></a>
    </li>
<?php } ?>
    </ul>
<?php } ?>
<div class="custom-div">
        <a href="<?php echo $category['href']; ?>" class="see-all"><?php echo $text_all; ?><?php echo $category['name']; ?></a>
</div>
                                </div>
                            </li>
                            <?php } else { ?>
                            <li>
                                <a class="custom" href="<?php echo $category['href']; ?>"><?php echo $category['name']; ?></a>
                            </li>
                            <?php } ?>
                            <?php } ?>
                        </ul>
                    </div><!--/.nav-collapse -->
                </div>
                <?php } ?>
            </div>
        </div>
        <div class="col-sm-9">
            <div class="row">
                <div class="col-sm-12">
                    <?php echo $modules['0']; ?>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <?php echo $modules['1']; ?>
                </div>
                <div class="col-sm-6">
                    <?php echo $modules['2']; ?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php } ?>